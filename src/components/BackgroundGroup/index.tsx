import * as React from 'react'

interface BackgroundLayerProps {
  imageUrl: string
}

class BackgroundLayerComponent extends React.Component<BackgroundLayerProps> {
  render() {
    return (
      <div
        className="full overflow-hidden"
        style={{ width: 'calc(100% + 80px)', marginLeft: '-40', filter: 'blur(40px)' }}
      >
        <img className="full-width" src={this.props.imageUrl} />
      </div>
    )
  }
}

export class BackgroundGroupComponent extends React.Component {
  render() {
    return (
      <div
        className="full position-absolute"
        style={{ zIndex: -1 }}
      >
        <BackgroundLayerComponent imageUrl="./media/market-images/trump-shocked.jpg" />
        <BackgroundLayerComponent imageUrl="" />
      </div>
    )
  }
}
