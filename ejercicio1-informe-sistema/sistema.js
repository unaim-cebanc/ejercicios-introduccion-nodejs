import pc from 'picocolors'
import os from 'node:os'
// TODO: Buscar como conseguir el modelo de CPU
const cpus = os.cpus()
const memtotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
const memlibre = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
const memusada = memtotal - memlibre;
const porcentaje = ((memusada / memtotal) * 100).toFixed(2);

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

console.log(pc.cyan(pc.bold('=============== Información del sistema ===============')));
console.log(pc.dim('Equipo:         '), os.hostname());
console.log(pc.dim('Usuario actual: '), os.userInfo().username);
console.log(pc.dim('Sistema:        '));
console.log(pc.dim(pc.italic('\tSistema Operativo: ')), os.platform());
console.log(pc.dim(pc.italic('\tVersion:           ')), os.release());
console.log(pc.dim(pc.italic('\tArquitectura:      ')), os.arch());
console.log(pc.dim('Procesador:     '));
console.log(pc.dim(pc.italic('\tModelo:            ')), cpus[0].model);
console.log(pc.dim(pc.italic('\tCantidad:          ')), cpus.length)
console.log(pc.dim('Memoria:        '));
console.log(pc.dim(pc.italic('\tTotal:             ')), memtotal, 'GB');
console.log(pc.dim(pc.italic('\tLibre:             ')), memlibre, 'GB');
console.log(pc.dim(pc.italic('\t% Usado:           ')), colorearPorcentaje(porcentaje));
console.log(pc.cyan(pc.bold('======================================================')));
