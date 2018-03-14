/**
 * List is a the base class for react kendo grid lists
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

export default class List extends Component {

    initState () {
        return {
            hasPermissions: true,
            permissionsErrorMessage: 'You don\'t have the required permissions to view this content',
            editPath: '/record/edit',
            modelUid: 'id'
        };
    }

    constructor (props) {
        super(props);
        this.state = Object.assign(this.initState(), props);
        if (this.state.refreshGrid) this.gridRendered = false;
    }

    shouldComponentUpdate (prevState, nextState) {
        if (nextState.hasPermissions === false) {
            return true;
        }
        return !this.gridRendered;
    }

    addRecord (model) {
        Meteor.call('templates.insert', model);
    }

    editRecord (model) {
        Meteor.call('templates.update', model._id, model);
    }

    deleteRecord (model) {
        Meteor.call('templates.remove', model._id, model);
    }

    beforeEdit (history, model, onEditEndCallback) {
        const id = !model[this.state.modelUid]
            ? 'new'
            : model[this.state.modelUid];
        history.push(`${this.state.editPath}/${id}`);
    }

    onInitGrid () {}

    onLoad (data) {
        data.map(item => {
            if (item === 'DENIED') {
                this.setState({hasPermissions: false});
            }
        });

        const templates = getTemplatesFromCollection();
        const serviceLines = getServiceLinesFromCollection();

        if (!this.gridRendered) {
            const gridOpts = {
                el: this.refGrid,
                data: templates,
                serviceLineMap: getServiceLineMap(serviceLines),
                onInit: this.onInitGrid.bind(this),
                addCallback: this.addRecord.bind(this),
                editCallback: this.editRecord.bind(this),
                removeCallback: this.deleteRecord.bind(this),
                beforeEditCallback: this.beforeEdit.bind(this,
                    this.props.history)
            };
            setTimeout(grid(gridOpts), 1000);
            this.gridRendered = true;
        }
    }

    componentDidMount () {
        this.setState({hasPermissions: true});
        loadGrid(this.onLoad.bind(this));
    }

    renderErrorPermissions () {
        return (
            <div className="error-load form-container">
                <h3>Warning</h3>
                <p>{this.state.permissionsErrorMessage}</p>
            </div>
        );
    }

    renderGridContainer () {
        return (
            <div className="grid-container" ref={el => (this.refList = el)}>
                <div ref={el => (this.refGrid = el)}/>
            </div>
        );
    }

    render() {
        return (
            <div>
                {!this.state.hasPermissions && this.renderErrorPermissions()}
                {this.state.hasPermissions && this.renderGridContainer()}
                <CircularProgress className='loading' size={80} thickness={6}
                                  style={{
                                      position: 'fixed',
                                      left: '41%',
                                      top: '40%'
                                  }}
                                  color='white'
                />
            </div>
        );
    }
}
