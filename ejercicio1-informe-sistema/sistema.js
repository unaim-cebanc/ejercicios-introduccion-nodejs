import pc from 'picocolors'
import os from 'node:os'

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

const contenido = [
    `${pc.cyan(pc.bold('=============== Información del sistema ==============='))}`,
    `${pc.dim('Equipo:')}  ${equipo}`,
    `${pc.dim('Usuario:')} ${usuario}`,
    `${pc.dim('Sistema:')}`,
    `\t${pc.dim(pc.italic('SO:'))}           ${so}`,
    `\t${pc.dim(pc.italic('Version:'))}      ${version}`,
    `\t${pc.dim(pc.italic('Arquitectura:'))} ${arq}`,
    `${pc.dim('Procesador:')}`,
    `\t${pc.dim(pc.italic('Modelo:'))}       ${modelocpu}`,
    `\t${pc.dim(pc.italic('Cantidad:'))}     ${qtycpu}`,
    `${pc.dim('Memoria:')}`,
    `\t${pc.dim(pc.italic('Total:'))}        ${memtotal}`,
    `\t${pc.dim(pc.italic('Libre:'))}        ${memlibre}`,
    `\t${pc.dim(pc.italic('% Usado:'))}      ${colorearPorcentaje(porcentaje)}`,
    `${pc.cyan(pc.bold('======================================================'))}`
].join('\n');

export function nombreOs(plataforma) {
    switch (plataforma) {
        case 'win32': return 'Windows';
        case 'linux': return 'Linux';
        default: return 'Desconocido'
    }
}

function colorearPorcentaje(porcentaje) {
    const texto = porcentaje + '%';
    if (porcentaje > 85) {
        return pc.red(texto);
    } else if (porcentaje <= 85 && porcentaje >= 60) {
        return pc.yellow(texto);
    } else {
        return pc.green(texto);
    }
}

export function imprimirContenido() {
    console.log(contenido);
}

if (import.meta.main) {
    imprimirContenido();
}