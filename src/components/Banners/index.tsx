import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { AuthComponent } from '../Auth'
import { MarketOverviewComponent } from '../MarketOverview'
import { Market } from '../../lib/Market'
import { Snowdrop } from 'pollenium-snowdrop'

export interface BannerStruct {
  imageUrl: string,
  onSelect: () => void
}

class BannerComponent extends React.Component<{ struct: BannerStruct }> {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }
  render() {
    return (
      <div
        className="overflow-hidden"
        style={{
          height: '100%',
          backgroundImage: `url(${this.props.struct.imageUrl})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
        onClick={ this.onClick.bind(this) }>
      </div>
    )
  }
  onClick() {
    this.props.struct.onSelect()
  }
}


export class BannersComponent extends React.Component<{
  bannerStructs: BannerStruct[],
  bannerId: string,
  bannerIdSnowdrop: Snowdrop<string>
}, {}> {

  constructor(props) {
    super(props)
  }

  render() {
    const bannerComponents = this.props.bannerStructs.map((bannerStruct, index) => {
      return <BannerComponent key={ index } struct={ bannerStruct }/>
    })
    return (<div style={{ height: 200 }}>{ bannerComponents }</div>)
  }

}
