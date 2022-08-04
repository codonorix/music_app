import React from 'react';
import renderer from 'react-test-renderer';
import {Heading} from "../components/Heading";

test('snapshot test renders correctly', () => {
    const testRenderer = renderer.create(<Heading />);
    expect(testRenderer.toJSON()).toMatchSnapshot()
})