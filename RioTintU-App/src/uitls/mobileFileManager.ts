import * as FileSystem from 'expo-file-system';
import { FileManager } from "../RioTintU-VM/ts/src/assembler/fileManager";

export class MobileFileManager implements FileManager {

    private readPath: string;
    private writePath: string;

    constructor(readPath: string, writePath: string) {
        this.readPath = readPath;
        this.writePath = writePath;
    }

    public getLines(): Map<string, string[]> {
        let result: Map<string, string[]> = new Map();
        FileSystem.readDirectoryAsync(this.readPath)
            .then(files => {
                const filePromises = files.map(file => {
                    const filePath = `${this.readPath}/${file}`;
                    return FileSystem.readAsStringAsync(filePath).then(data => ({
                        file,
                        lines: data.split('\n').filter(line => line.trim() && !line.startsWith('/') && !line.startsWith('#')),
                    }));
                });

                return Promise.all(filePromises);
            })
            .then(fileContents => {
                fileContents.forEach(({ file, lines }) => {
                    result.set(file, lines);
                });
            })
            .catch(err => {
                console.error(`Error reading files in directory ${this.readPath}:`, err);
            });

        // Retorna o mapa vazio inicialmente; será preenchido conforme as promessas são resolvidas.
        return result;
    }

    public setLines(filesMap: Map<string, string[]>): void {
        const writePromises: Promise<void>[] = [];
        FileSystem.getInfoAsync(this.writePath)
            .then(dirInfo => {
                if (!dirInfo.exists) {
                    return FileSystem.makeDirectoryAsync(this.writePath, { intermediates: true });
                }
            })
            .then(() => {
                filesMap.forEach((lines, fileName) => {
                    const filePath = `${this.writePath}/${fileName}`;
                    const data = lines.join('\n');
                    writePromises.push(FileSystem.writeAsStringAsync(filePath, data));
                });

                return Promise.all(writePromises);
            })
            .catch(err => {
                console.error(`Error writing files to directory ${this.writePath}:`, err);
            });
    }
}
