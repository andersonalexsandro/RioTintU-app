import * as FileSystem from 'expo-file-system';
import { FileManager } from "../RioTintU-VM/ts/src/assembler/fileManager";

export class MobileFileManager implements FileManager {
  private readPath: string;
  private writePath: string;

  constructor(readPath: string, writePath: string) {
    this.readPath = `${FileSystem.documentDirectory}${readPath}/`;
    this.writePath = `${FileSystem.documentDirectory}${writePath}/`;
  }

  public getLines(): Map<string, string[]> {
    const result: Map<string, string[]> = new Map();

    try {
      // Check if the directory exists
      FileSystem.getInfoAsync(this.readPath).then((dirInfo) => {
        if (!dirInfo.exists) {
          console.warn(`Directory does not exist: ${this.readPath}`);
          return result;
        }

        // Read the directory and its files
        FileSystem.readDirectoryAsync(this.readPath)
          .then((files) => {
            files.forEach((file) => {
              const filePath = `${this.readPath}${file}`;
              FileSystem.readAsStringAsync(filePath).then((data) => {
                const lines = data.split('\n');
                result.set(file, lines);
              });
            });
          })
          .catch((err) =>
            console.error(`Error reading files in directory ${this.readPath}:`, err)
          );
      });
    } catch (err) {
      console.error(`Error accessing directory ${this.readPath}:`, err);
    }

    return result;
  }

  public setLines(filesMap: Map<string, string[]>): void {
    try {
      // Ensure the directory exists
      FileSystem.getInfoAsync(this.writePath)
        .then((dirInfo) => {
          if (!dirInfo.exists) {
            return FileSystem.makeDirectoryAsync(this.writePath, {
              intermediates: true,
            });
          }
        })
        .then(() => {
          filesMap.forEach((lines, fileName) => {
            const filePath = `${this.writePath}${fileName}`;
            const data = lines.join('\n');
            FileSystem.writeAsStringAsync(filePath, data).catch((err) =>
              console.error(`Error writing file ${filePath}:`, err)
            );
          });
        })
        .catch((err) => {
          console.error(`Error ensuring directory ${this.writePath}:`, err);
        });
    } catch (err) {
      console.error(`Error writing files to directory ${this.writePath}:`, err);
    }
  }
}
