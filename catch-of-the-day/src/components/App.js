import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import samplefishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;

    // First reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    const storeId = this.props.match.params.storeId;
    localStorage.setItem(storeId, JSON.stringify(this.state.order));
  }

  addFish = (fish) => {
    // Copy the current state
    const fishes = { ...this.state.fishes };

    // Add our new fish to the fishes variable
    fishes[`fish${Date.now() + Math.floor(Math.random() * 100)}`] = fish;

    // Set the new fishes object to state
    this.setState({ fishes });
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  loadSampleFishes = () => {
    const fishes = { ...this.state.fishes, ...samplefishes };

    this.setState({ fishes });
  };

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='fishes'>
            {Object.keys(this.state.fishes).map((key, index) => (
              <Fish
                key={index}
                index={key} //The key isn't a prop by default so it needs to be passed with a name other than key
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
