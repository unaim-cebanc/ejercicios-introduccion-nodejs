import pc from 'picocolors'
import path from 'node:path'
import fs from 'node:fs/promises'
import { stat } from 'node:fs';

const carpeta = process.argv[2] ?? '.';

async function ls(carpeta) {
    let contenido;
    let carpetas = 0;
    let archivos = 0;
    let sizes = 0;
    
    try {
        contenido = await fs.readdir(carpeta);
        
        console.log(
                pc.bold('Nombre'.padEnd(30)),
                pc.bold('Tamaño'.padStart(8))
            );
        
        for (const archivo of contenido) {
            const filePath = path.join(carpeta, archivo);
            
            let stats;
            try {
                stats = await fs.stat(filePath);
            } catch {
                console.log(pc.red(pc.bold('No se ha podido leer el archivo')));
            }
            
            if (stats.isDirectory()) {
                console.log(pc.blue((archivo + '/').padEnd(30)));
                carpetas = carpetas + 1;
            }
            if (stats.isFile()) {
                if (archivo.indexOf('.') == 0) {
                    console.log(pc.dim(archivo.padEnd(30)));
                    archivos = archivos + 1;
                    continue;
                }
                
                let tamaño = (stats.size / 1024).toFixed(2);
                console.log(
                    pc.green(archivo.padEnd(30)),
                    pc.gray((tamaño + 'KB').padStart(8))
                );
                archivos = archivos + 1;
                sizes = sizes + tamaño;
            }
        }
        console.log(
            pc.bold(carpetas) + ' carpetas',
            pc.bold(archivos) + ' archivos',
            pc.bold(sizes) + ' KB en total'
        );
    } catch {
        console.error(pc.red(pc.bold('Ruta introducida no existe')));
        process.exit(1);
    }
}

ls(carpeta);