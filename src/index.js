const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')
const unirest = require('unirest');
class WebailyCommand extends Command {
  async run() {
    const {flags} = this.parse(WebailyCommand)
    const url = flags.url
    const type = flags.type
    const thiss = this
    if(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url)){
      cli.action.start('WebAily -> Shortening...')
      let type2;
      if(type === "long"){
        type2 = 'long'
      }else{
        type2 = 'short'
      }
      const data = JSON.stringify({
        url: url,
        type: type2,
        token: "bGVzemVra0BsZXN6ZWtrLmV1"
      });
      unirest.post('https://webaily.web.app/shorturl')
      .headers({'Content-Type': 'application/json'})
      .send(data)
      .then((response) => {
        const resJSON = JSON.parse(response.body);
        const shortedUrl = resJSON.url;
        cli.action.stop()
        thiss.log(`--- --- --- --- --- ---`)
        thiss.log(`Shorted URL: ${shortedUrl}`)
        thiss.log(`--- --- --- --- --- ---`)  
      })
      .catch(error => {
        cli.action.stop()
        thiss.error(`API Error`)
      })
    }else{
      thiss.error(`Provide valid URL!`)
    }
  }
}

WebailyCommand.description = `
...
Short URLs directly from command prompt.
* - required
`

WebailyCommand.flags = {
  help: flags.help({char: 'h'}),
  url: flags.string({char: 'u', description: 'URL to short *'}),
  type: flags.string({char: 't', description: 'Type of shortLink (short / long) - short is default'}),
}

module.exports = WebailyCommand
