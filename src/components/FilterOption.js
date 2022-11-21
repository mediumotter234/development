import React, { Component } from "react";

export default class FilterOption extends Component {
  render() {
    const { type, id, name, onChange, checked } = this.props;

    return (
      <div>
        <input
          id={id}
          type={type}
          name={name}
          onChange={onChange}
          checked={checked}
        />
        <label htmlFor={id}>{name}</label>
      </div>
    );
  }
}