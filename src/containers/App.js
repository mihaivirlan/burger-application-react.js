import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Auxiliary from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

    constructor(props) {
        super(props);
        console.log('[App.js] Inside Constructor', props);
        this.state = {
            persons: [
                { id: 'ceva', name: 'Max', age: 28},
                { id: 'ceva1', name: 'Marius', age: 23},
                { id: 'ceva2', name: 'Marcus', age: 25}
            ],
            otherState: 'Some other value',
            showPersons: false,
            toggleClicked: 0,
            authenticated: false
        }
    }

    componentWillMount() {
        console.log('[App.js] Inside componentWillMount()')
    }

    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()')
    }

    // componentWillReceiveProps( nextProps ) {
    //     console.log('[Update App.js] Inside componentWillReceiveProps', nextProps)
    // }

    // shouldComponentUpdate( nextProps, nextState ) {
    //     console.log('[Update App.js] Inside shouldComponentUpdate', nextProps, nextState);
    //     return nextState.persons !== this.state.persons ||
    //            nextState.showPersons !== this.state.showPersons;
    // }

    componentWillUpdate( nextProps, nextState ) {
        console.log('[Update App.js] Inside componentWillUpdate', nextProps, nextState);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('[Update App.js] Inside getDrivedStateFromProps', nextProps, prevState);
        return prevState;
    }

     getSnapshotBeforeUpdate() {
        console.log('[Update App.js] Inside getSnapshotBeforeUpdate');
    }

    componentDidUpdate() {
        console.log('[Update App.js] Inside componentDidUpdate');
    }
  // state = {
  //   persons: [
  //     { id: 'ceva', name: 'Max', age: 28},
  //     { id: 'ceva1', name: 'Marius', age: 23},
  //     { id: 'ceva2', name: 'Marcus', age: 25}
  //   ],
  //   otherState: 'Some other value',
  //     showPersons: false
  // };

nameChangedHandler = ( event, id ) => {

  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });

  const person = {
      ...this.state.persons[personIndex]
  };

  // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

  this.setState( {persons: persons} );
};

deletePersonHandler = (personIndex) => {
  // const persons = this.state.persons.slice();
  const persons = [...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons});
};

togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( ( prevState, props ) => {
        return {
            showPersons: !doesShow,
            toggleClicked: prevState.toggleClicked + 1
        }

    } );
};

loginHandler = () => {
    this.setState({authenticated: true});
};

render() {
console.log('[App.js] Inside render()');
let persons = null;

if (this.state.showPersons) {
    persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}/>;
  }

return (
        <Auxiliary>
         <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
         <Cockpit
             appTitle={this.props.title}
             showPersons={this.state.showPersons}
             persons={this.state.persons}
             login={this.loginHandler}
             clicked={this.togglePersonsHandler}/>
            <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
        </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);
