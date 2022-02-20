//Kreiranje http varijable da zahteva http protokol

const http = require('http');
const { type } = require('os');

const uraditi = [
    {'id':1, 'obaveza':'uradi zadatke iz DWH'},
    {'id':2, 'obaveza':'uradi zadatke iz Logike'},
    {'id':3, 'obaveza':'prodji ponovo Integracije'}]

/*http ima metod CreateServer, unutar toga formativna funkcija
koja uzima argumente request & response*/
const server = http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type' : 'application/json',
        'X-Powered-By' : 'Node.js'
    })

    /*
    res.write('<h1>Hello again!</h1>')
    Umesto write ispisujemo objekat koji konvertujemo u JSON notaciju*/

    res.end(JSON.stringify({
        success:true,
        // error:"Nema podataka"
        data:uraditi
    }));
});



/*Aktivacija servera*/
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
