/**
 * List is a the base class for react kendo grid lists
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

export default class List extends Component {

    initState () {
        return {
            hasPermissions: true,
            permissionsErrorMessage: 'You don\'t have the required permissions to view this content',
            editPath: '/record/edit',
            modelUid: 'id'
        };
    }

    /**
     * Template method
     */
    afterInstantiation() {}

    /**
     * 
     * @param {Object} props should have a listData property
     */
    constructor (props) {
        super(props);
        this.state = Object.assign(this.initState(), props);
        this.afterInstantiation(props);
    }

    beforeEdit (history, model, onEditEndCallback) {
        const id = !model[this.state.modelUid]
            ? 'new'
            : model[this.state.modelUid];
        history.push(`${this.state.editPath}/${id}`);
    }

    componentDidMount () {
        this.setState({hasPermissions: true});
    }

    renderErrorPermissions () {
        return (
            <div className="error-load form-container">
                <h3>Warning</h3>
                <p>{this.state.permissionsErrorMessage}</p>
            </div>
        );
    }

    /**
     * Template method should be overriden by implementing class
     */
    renderGridContainer () {
        return (
            <Grid
                style={{ maxHeight: '400px' }}
                data={this.state.listData}
            >
                <Column field="ProductID" title="ID" width="40px" />
                <Column field="ProductName" title="Name" width="250px" />
                <Column field="Category.CategoryName" title="CategoryName" />
                <Column field="UnitPrice" title="Price" width="80px" />
                <Column field="UnitsInStock" title="In stock" width="80px" />
            </Grid>
        );
    }

    render() {
        return (
            <div>
                {!this.state.hasPermissions && this.renderErrorPermissions()}
                {this.state.hasPermissions && this.renderGridContainer()}
            </div>
        );
    }
}
