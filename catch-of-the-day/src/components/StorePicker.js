import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // Old way to bind custom methods to the component
  // This can be replaced by using arrow functions for custom methods like the goToStore
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  myInput = React.createRef();

  goToStore = (event) => {
    event.preventDefault();
    const storeName = this.myInput.current.value;
    // Here we can access the Route method push() because the StorePicker is a child of Route
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form onSubmit={this.goToStore} className='store-selector'>
        <h2>Please Enter A Store</h2>
        <input
          type='text'
          required
          ref={this.myInput}
          placeholder='Store Name'
          defaultValue={getFunName()}
        />
        <button type='submit'>Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
