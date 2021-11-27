import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import samplefishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  state = {
    fishes: {},
    orders: {},
  };

  addFish = (fish) => {
    // Copy the current state
    const fishes = { ...this.state.fishes };

    // Add our new fish to the fishes variable
    fishes[`fish${Date.now() + Math.floor(Math.random() * 100)}`] = fish;

    // Set the new fishes object to state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    // this.setState({ fishes: samplefishes });

    Object.keys(samplefishes).map((key) => {
      console.log(samplefishes[key]);
      this.addFish(samplefishes[key]);
    });
  };

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='fishes'>
            {Object.keys(this.state.fishes).map((key, index) => (
              <Fish key={index} details={this.state.fishes[key]} />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
