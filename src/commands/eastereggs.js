const chalk = require('chalk');

class EasterEggs {
    matrix() {
        console.clear();
        console.log(chalk.green('\n🔋 Siguiendo al conejo blanco...\n'));

        const matrixChars = '01アイウエオカキクケコ';
        let lines = 20;

        const interval = setInterval(() => {
            let line = '';
            for (let i = 0; i < 80; i++) {
                line += matrixChars[Math.floor(Math.random() * matrixChars.length)];
            }
            console.log(chalk.green(line));

            lines--;
            if (lines === 0) {
                clearInterval(interval);
                console.log(chalk.green('\n"Wake up, Neo..."\n'));
            }
        }, 100);
    }

    async hack() {
        console.clear();
        console.log(chalk.red('\n💀 INICIANDO SECUENCIA DE HACKING...\n'));

        const steps = [
            'Conectando al mainframe...',
            'Bypasseando firewall...',
            'Accediendo a la base de datos...',
            'Descifrando contraseñas...',
            'Descargando archivos secretos...',
            'Limpiando rastros...'
        ];

        for (const step of steps) {
            await this.sleep(800);
            console.log(chalk.yellow('[') + chalk.green('OK') + chalk.yellow('] ') + step);
        }

        await this.sleep(1000);
        console.log(chalk.green('\n✅ ACCESO CONCEDIDO\n'));
        console.log(chalk.gray('(Solo bromeaba, esto es solo una simulación 😄)\n'));
    }

    wisdom() {
        const quotes = [
            '"El código es poesía." - Wordpress',
            '"Hazlo simple, pero significativo." - Don Draper',
            '"La perfección se logra, no cuando no hay nada más que agregar, sino cuando no hay nada más que quitar." - Antoine de Saint-Exupéry',
            '"Primero, resuelve el problema. Entonces, escribe el código." - John Johnson',
            '"El mejor código es el que no se escribe." - Jeff Atwood',
            '"Cualquier tonto puede escribir código que una computadora entienda. Buenos programadores escriben código que los humanos entienden." - Martin Fowler'
        ];

        const quote = quotes[Math.floor(Math.random() * quotes.length)];

        console.log(chalk.cyan('\n💭 Sabiduría del día:\n'));
        console.log(chalk.white(quote));
        console.log('');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = new EasterEggs();