import * as React from 'react'

interface BackgroundLayerProps {
  imageUrl: string
}

class BackgroundLayerComponent extends React.Component<BackgroundLayerProps> {
  render() {
    return (
      <div
        className="full overflow-hidden"
      >
        <div style={{ width: 'calc(100% + 80px)', marginLeft: '-40', filter: 'blur(40px)' }}>
          <img className="width-full" src={this.props.imageUrl} />
        </div>
      </div>
    )
  }
}

export class BackgroundGroupComponent extends React.Component {
  render() {
    return (
      /* BackgroundGroup */
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
