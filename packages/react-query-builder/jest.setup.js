// Extend the default Jest test configuration from CRA with enzyme.
const { configure, shallow, render, mount } = require('enzyme');

// Starting with Enzyme 3 each React version is supported with a
// specific adapter.
const Adapter = require('enzyme-adapter-react-16');

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Configure the React adapter for Enzyme.
configure({ adapter: new Adapter() });
