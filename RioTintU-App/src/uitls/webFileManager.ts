import { FileManager } from "../RioTintU-VM/ts/src/assembler/fileManager";

export class WebFileManager implements FileManager {
    private readPath: string;
    private writePath: string;
  
    constructor(readPath: string, writePath: string) {
      this.readPath = readPath;
      this.writePath = writePath;
    }
  
    public getLines(): Map<string, string[]> {
      const result: Map<string, string[]> = new Map();
  
      try {
        const data = localStorage.getItem(this.readPath);
  
        if (data) {
          const files = JSON.parse(data) as Record<string, string>;
          Object.entries(files).forEach(([file, content]) => {
            const lines = content.split('\n');
            result.set(file, lines);
          });
        }
      } catch (err) {
        console.error(`Error reading files from web storage for path ${this.readPath}:`, err);
      }
  
      return result;
    }
  
    public setLines(filesMap: Map<string, string[]>): void {
        console.log("setLines called with:", filesMap);
    
        try {
            const files: Record<string, string> = {};
    
            filesMap.forEach((lines, fileName) => {
                files[fileName] = lines.join('\n');
            });
    
            console.log("Saving to localStorage:", this.writePath, JSON.stringify(files));
            localStorage.setItem(this.writePath, JSON.stringify(files));
        } catch (err) {
            console.error(`Error writing files to web storage for path ${this.writePath}:`, err);
        }
    }
  }
  