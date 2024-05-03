import './Grid.css';
import React from 'react';

const KEY = 'data';

class Grid extends React.Component
{
    state = {
        fetchResult: 0,
        data: {},
        search: '',
        sort: 0,
    };
    componentDidMount() {
        const restore = localStorage.getItem(KEY);
        if (restore) {
            this.setState({fetchResult: 1, data: JSON.parse(restore)});
            return;
        }
	}
    deleteRow(e) {
        const restore = this.state.data;
        for (var i = 0; i < restore.length; i++) {
            let row = restore[i];
            if (row.name === e.name) {
                row.deleted = true;
            }
            restore[i] = row;
        }
        if (restore) {
            this.setState({fetchResult: 1, data: restore});
            return;
        }
    }
    renderSearch() {
        const S = this.state;
        return (
            <input
                value={S.search}
                placeholder={"Search"}
                onChange={(e) => this.setState({...S, search: e.target.value})}
            />
        );
    }
    renderSort() {
        const S = this.state;
        const label = !S.sort ? 'None' : 'Alphabetically';
        const action = S.sort ? 0 : 1;
        return (
            <button
                className='GridSort'
                onClick={() => this.setState({...S, sort: action})}
            >
                Sort: {label}
            </button>
        );
    }
    render() {
        const S = this.state;
        if (!S.data.length) {
            return null;
        }
        let copy = [ ...S.data ];
        if (S.search) {
            copy = copy.filter(x => x.name.includes(S.search));
        }
        copy = copy.filter(x => x.deleted !== true);
        if (S.sort) {
            copy = copy.sort((a, b) => a.name.localeCompare(b.name));
        }
        return (
            <div className='Grid' >
                <div className={'GridBar'} >
                    {this.renderSort()}
                    <div />
                    {this.renderSearch()}
                </div>
                <div className='GridBody' >
                {copy.map(x => (
                    <div
                        key={x.name}
                    >
                        <span
                            onClick={() => {
                                localStorage.setItem('details', JSON.stringify(x));
                                window.location.href = '/details';
                            }}
                        >
                            {x.name}
                        </span>
                        <button
                            onClick={() => this.deleteRow(x) }
                        >
                            Delete
                        </button>
                    </div>
            ))}
            </div>
        </div>
    );
  }
}

export default Grid;
