import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { pages } from '../../pages/pagesConfig';
import './pageContainer.scss';

class PageContainer extends Component {
  render() {

    const getConatinerClass = () => {
        let currentPath = this.props.location.pathname;
        let pageClass = 'route-error';

        Object.keys(pages).forEach(key => {
            if(pages[key].path == currentPath){
                pageClass = pages[key].bodyClass;
            }
        });
        
        return `page-container ${pageClass}`;
    };

    return (
        <div className={getConatinerClass()}>
            {this.props.children}
        </div>
    );
  }
}

export default withRouter(PageContainer);
