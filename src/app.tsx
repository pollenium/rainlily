import * as React from 'react'
import { createElement, Component } from 'react';
import { render } from 'react-dom';
import { NotificationsComponent } from './components/Notifications'
import { StatusbarComponent } from './components/Statusbar'
import { NavbarPrimaryComponent } from './components/NavbarPrimary'
import { NavbarSecondaryComponent } from './components/NavbarSecondary'
import { BackgroundGroupComponent } from './components/BackgroundGroup'
import { BannersComponent, BannerStruct } from './components/Banners'
import { BrambleMonitorComponent } from './components/BrambleMonitor'
import { OptionStruct } from './components/Options'
import { ModalComponent } from './components/Modal'
import { Market } from './classes/Market'
import { markets } from './globals/markets'
import { Snowdrop } from 'pollenium-snowdrop'
import { hot } from 'react-hot-loader'

export class AppComponent extends Component<{}, {
  mainElement?: JSX.Element,
  modalElement?: JSX.Element,
  navbarSecondaryOptionId?: string,
  bannerId?: string
}> {

  private readonly navbarSecondaryOptionIdSnowdrop = new Snowdrop<string>()
  private readonly bannerIdSnowdrop = new Snowdrop<string>()

  constructor(props) {
    super(props)
    this.state = {
      navbarSecondaryOptionId: markets[0].id
    }
  }

  render() {

    const navbarSecondaryOptionStructs: OptionStruct[] = markets.map((market) => {
      return {
        id: market.id,
        text: market.name,
        onSelect: () => {
          this.setBannerId(market.id)
          this.setState({
            mainElement: market.getElement()
          })
        }
      }
    })

    const bannerStructs: BannerStruct[] = markets.map((market) => {
      return {
        imageUrl: market.imageUrl,
        onSelect: () => {
          this.setNavbarSecondaryId(market.id)
        }
      }
    })

    return (
      <div className="full">
        <BackgroundGroupComponent/>
        <div className="flex-rows full bg-dark">
          <div className="flex-no-change position-relative">
            <NotificationsComponent/>
            <StatusbarComponent/>
          </div>
          <div className="flex-grow">
            <ModalComponent/>
            <div className="flex-rows full">
              <div className="flex-no-change">
                <NavbarSecondaryComponent
                  optionStructs={ navbarSecondaryOptionStructs }
                  optionId={ this.state.navbarSecondaryOptionId }
                  />
              </div>
              <div className="flex-shrink flex-grow">
                <div className="container flex-rows full">
                  <div className="flex-no-change">
                    <BannersComponent
                      bannerStructs={ bannerStructs }
                      bannerId={ this.state.bannerId }
                      bannerIdSnowdrop={ this.bannerIdSnowdrop }
                      />
                  </div>
                  <div className="flex-grow flex-shrink">
                    { this.state.mainElement }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BrambleMonitorComponent />
        </div>
      </div>
    );
  }
  setNavbarSecondaryId(navbarSecondaryOptionId: string) {
    this.setState({ navbarSecondaryOptionId })
  }
  setBannerId(bannerId: string) {
    this.setState({ bannerId })
  }
}

export const HotAppComponent = hot(module)(AppComponent)
