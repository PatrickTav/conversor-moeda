function conToReal(dolar) {
    return (dolar * 5.65)
}
function conToDolar(real) {
    return (real / 5.65)
}

function converterMoeda(value, convert) {
    const input = parseFloat(value);
        if (Number.isNaN(input)) {
            return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
}



class Moeda extends React.Component {
    constructor(props) {
        super(props)
        this.changeValue = this.changeValue.bind(this)
    }

    changeValue(e) {
        this.props.onChange(e.target.value)
    }

    render() {
        let value = this.props.value
        let moeda = this.props.moeda
        let name = this.props.name
        return (
            <div>
                <fieldset>
                    {name} {moeda} :
                    <input type='number' value={value}
                        onChange={this.changeValue} />
                </fieldset> <br />
            </div>
        )
    }
}



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            moeda: 'R$',
            value: ''
        }
        this.conDolar = this.conDolar.bind(this)
        this.conReal = this.conReal.bind(this)
    }

    conDolar(value){
        this.setState({moeda:'US$', value})
    }
    conReal(value){
        this.setState({moeda:'R$', value})
    }

    render() {
        let moeda = this.state.moeda
        let value = this.state.value
        let real = moeda === 'US$' ? converterMoeda(value, conToDolar): value
        let dolar = moeda === 'R$' ? converterMoeda(value, conToReal): value

        return (
            <div>
                <Moeda moeda='R$' name='Real' value={real} onChange={this.conReal}/>
                <Moeda moeda='US$' name='Dollar' value={dolar} onChange={this.conDolar} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#App')
)