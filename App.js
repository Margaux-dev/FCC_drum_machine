const sounds = [
    {id: 'Snare', letter: 'Q', src: 'https://www.myinstants.com/media/sounds/snare.mp3'},
    {id: 'Bass 1', letter: 'W', src: 'https://www.myinstants.com/media/sounds/bass-drum.mp3'},
    {id: 'Bongo', letter: 'E', src: 'http://tipiwiki.free.fr/snd/Percussion(4e)2.wav'},
    {id: 'Tom Tom', letter: 'A', src: 'http://www.denhaku.com/r_box/sr16/sr16tom/loelectm.wav'},
    {id: 'Bass 2', letter: 'S', src: 'http://billor.chsh.chc.edu.tw/sound/bass4.wav'},
    {id: 'Shotgun', letter: 'D', src: 'http://david.guerrero.free.fr/Effects/ShotgunReload.wav'},
    {id: 'High Hat', letter: 'Z', src: 'http://www.denhaku.com/r_box/tr707/closed.wav'},
    {id: 'Drum Hit', letter: 'X', src: 'http://www.masterbits.de/sc_docu/sounds1/1TM00013.MP3'},
    {id: 'Laser', letter: 'C', src: 'http://www.sa-matra.net/sounds/starcontrol/Umgah-Backzip.wav'}
]
  
  class DrumPad extends React.Component {
      constructor (props){
          super (props);
          this.state = {
              class: "drum-pad"
          }
      }
   
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        document.addEventListener('keyup', this.handleKeyup.bind(this));
    }
    
   componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown.bind(this));
        document.addEventListener('keyup', this.handleKeyup.bind(this));
   }
    
    handleKeydown (e) {
        if(e.keyCode === this.props.letter.charCodeAt()) {
            this.audio.play();
            this.audio.currentTime = 0;
            this.props.handleDisplay(this.props.id);
            this.setState({class: "drum-pad active"});
        }
    }

    handleKeyup (e) {
        if (e.keyCode === this.props.letter.charCodeAt()) {
            setTimeout(() => {
                this.setState({class: "drum-pad"})
            }, 80)
        }
    }
   
    handleClick () {
        this.audio.play();
        this.audio.currentTime = 0;
        this.props.handleDisplay(this.props.id);
    }
    
    render() {
        return (
        <div className={this.state.class} id={this.props.id} onClick={this.handleClick.bind(this)}>
            <h1>{this.props.letter}</h1>
            <audio id={this.props.letter} className='clip' src={this.props.src} ref={ref => this.audio = ref}></audio>
        </div>
      )
    }
  }
  

  class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            display: 'Click or press a key',
        }
    }
    
    handleDisplay (display) {
        this.setState({ display });
    }
    
    render(){
        return(
            <div id='drum-machine'>
                <div id='display'>
                    {this.state.display}
                </div>
                <div id='drum-pads'>
                    {sounds.map(sound => (
                        <DrumPad id={sound.id} letter={sound.letter} src={sound.src} handleDisplay={this.handleDisplay.bind(this)} />   
                    ))}
                </div>
            </div>
        )
    }
  }
  
  ReactDOM.render(<App/>,document.getElementById("root"))