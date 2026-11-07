import os from 'node:os'
import pc from 'picocolors'
import fs from 'fs'
import { imprimirContenido, nombreOs } from '../ejercicio1-informe-sistema/sistema.js';

const equipo = os.hostname();
const usuario = os.userInfo().username;

const so = nombreOs(os.platform());
const version = os.release();
const arq = os.arch();

const cpus = os.cpus();
const modelocpu = cpus[0].model;
const qtycpu = cpus.length

const memtotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
const memlibre = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
const memusada = memtotal - memlibre;
const porcentaje = ((memusada / memtotal) * 100).toFixed(2);

const fechaHora = new Date().toLocaleString('es-ES');

const contenido = [
    `Equipo: \t${equipo}`,
    `Usuario:\t${usuario}`,
    `Sistema:`,
    `\tSO:          \t${so}`,
    `\tVersion:     \t${version}`,
    `\tArquitectura:\t${arq}`,
    `Procesador:`,
    `\tModelo:  \t${modelocpu}`,
    `\tCantidad:\t${qtycpu}`,
    `Memoria:`,
    `\tTotal:  \t${memtotal}`,
    `\tLibre:  \t${memlibre}`,
    `\t% Usado:\t${porcentaje}`
].join('\n');

function generarInforme() {
    if (!fs.existsSync('informe.txt')) {
        console.log(
            pc.yellow(pc.bold('Advertencia:')),
            pc.yellow(pc.bold(pc.italic('informe.txt'))),
            pc.yellow(pc.bold('no existe'))
        );
        console.log(pc.yellow(pc.bold('Se va a crear el archivo')));
    } else {
        console.log(
            pc.yellow(pc.bold('Advertencia:')),
            pc.yellow(pc.bold('Se sobreescribirá el contenido de')),
            pc.yellow(pc.bold(pc.italic('informe.txt')))
        );
    }
    
    try {
        fs.writeFileSync('informe.txt', contenido);
    } catch (err) {
        console.log(pc.red(pc.bold(`Error: ${err}`)));
        process.exit(1);
    }
    console.log(
        pc.green(pc.bold('Informe guardado en')),
        pc.green(pc.bold(pc.italic('informe.txt')))
    );
}

function generarHistorial() {
    if (!fs.existsSync('historial.log')) {
        console.log(
            pc.yellow(pc.bold('Advertencia:')),
            pc.yellow(pc.bold(pc.italic('historial.log'))),
            pc.yellow(pc.bold('no existe'))
        );
        console.log(pc.yellow(pc.bold('Se va a crear el archivo')));
    }
    
    try {
        for (const linea of contenido.split('\n')) {
            fs.appendFileSync('historial.log', `${fechaHora} | ${linea.replaceAll('\t', ' ')}\n`);
        }
    } catch (err) {
        console.log(pc.red(pc.bold(`Error: ${err}`)));
    }
}

generarInforme();
generarHistorial();
imprimirContenido();