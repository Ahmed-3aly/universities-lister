import React from 'react';
import './Details.css';

class Details extends React.Component
{
    state = {};
    componentDidMount() {
        const details = localStorage.getItem('details');
        this.setState({ details: JSON.parse(details) });
    }
    renderState() {
        const S = this.state;
        const state = S.details["state-province"];
        if (!state) { return null; }
        return (
            <tr>
                <td>State:</td>
                <td>{state}</td>
            </tr>
        );
    }
    render() {
        const S = this.state;
        if (!S || !S.details) {
            return null;
        }
        const L = S.details.web_pages[0];
        return (
            <div
                className='Details'
            >
                <table>
                    <tbody>
                        <tr><td>Name:</td><td>{S.details.name}</td></tr>
                        <tr><td>Website:</td><td><a href={L} >{L}</a></td></tr>
                        <tr><td>Country:</td><td>{S.details.country}</td></tr>
                        {this.renderState()}
                    </tbody>
                </table>
            </div>
        );
  }
}

export default Details;
