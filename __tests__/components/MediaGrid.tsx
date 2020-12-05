import React from 'react'
import TestRenderer from 'react-test-renderer'

import MediaGrid, { Props } from '../../components/MediaGrid'

describe('Media Grid', () => {

  it('should show the Not Called node if there\'s no data', () => {
    const tree = TestRenderer.create(
      <MediaGrid {...props} NotCalled={<div>Not Called</div>} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show the Empty node if the data list is empty', () => {
    const tree = TestRenderer.create(
      <MediaGrid {...props} data={[]} Empty={<div>Empty</div>} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

const props: Props<unknown> = {
  getKey: () => 'key',
  getTitle: () => 'Title',
  getDescription: () => 'Description',
  getImageUrl: () => 'https://www.images.com/image.jpg',
}
