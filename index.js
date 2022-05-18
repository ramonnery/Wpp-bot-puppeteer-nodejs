const puppeteer = require('puppeteer');


(async () => {
  const input = require('prompt-sync')()
  const url = 'https://web.whatsapp.com/'
  const seletor = '.ggj6brxn'

  const browser = await puppeteer.launch({headless: false, userDataDir: "./user_data"});
  const page = await browser.newPage();
  
  await page.goto(url);
  await page.setViewport({width: 1366, height: 600})

  await page.waitForSelector(seletor)

  let contatos = await page.evaluate(() => {
    const seletor = '.ggj6brxn'
    let dadosDaTag = document.querySelectorAll(seletor)
    let listaDeContatos = []
    let contador = 0;
    
    dadosDaTag.forEach(contato => {
      if(contador % 2 === 0) {
        listaDeContatos.push(contato.getAttribute('title'))
      }
      contador++
    });

    return listaDeContatos
  })
  
  listaContatos(contatos)
  let resposta = input('- Digite um contato para enviar a mensagem: ')
  let indice = Number(resposta) - 1
  let contatoEscolhido = contatos[indice]
  console.log(`-- Você enviou uma mensagem para o contato: ${contatoEscolhido}`)
  
  await page.click(`[title="${contatoEscolhido}"]`)
  
  await page.click('[title="Mensagem"]')

  let mensagem = 'Esse mensagem foi enviada por um bot feito por mim.'
  await page.type('[title="Mensagem"]', mensagem)

  await page.click('[data-icon="send"]')
  
  // await browser.close();
})();


function listaContatos(listaDeContatos) {
  console.log('')
  console.log('- Lista de Contatos')
  console.log('')

  for(let indice = 0; indice < listaDeContatos.length; indice++) {
    console.log(`-- ${indice+1}) ${listaDeContatos[indice]}`)
  } 

  console.log('')
}

