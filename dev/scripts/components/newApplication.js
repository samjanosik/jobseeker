import React from 'react';
import {
    BrowserRouter as Router, Route, Link, NavLink, Switch
} from 'react-router-dom';
import firebase from 'firebase';
import moment from 'moment';

// new job application
export default class NewApplication extends React.Component{
    constructor() {
        super();
        this.state = {
            company: '',
            title: '',
            link: '',
            datePosted: '',
            dateApplied: '',
            name: '',
            email: '',
            followUp1: '',
            followUp2: '',
            followUp3: '',
            response: '',
            interview: '',
            thanks: '',
            interviewFollowUp1: '',
            interviewFollowUp2: '',
            lastEdited: '',
            archive: false,
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    // handle submit of the form
    handleSubmit(e) {
        e.preventDefault();

        const dbRef = firebase.database().ref(`users/${this.props.userId}/applications`);
        dbRef.push(this.state)
        this.setState({
            submitted: true
        })
    }
    // add each keystroke to component state & record last edited date
    handleChange(e, id){
        const now = moment().format('x');

        this.setState({
            [id]: e.target.value,
            lastEdited: now
        })
    }
    render() {
        return(
            <main className='newApplicationForm wrapper'>

                <Link className='backToDash' to='/'>
                    <i className="fa fa-long-arrow-left fw" aria-hidden="true"></i> back
                </Link>

                <Link to='/'>
                    {this.state.submitted
                        ? <ApplicationFeedback feedback={this.state} />
                        : null
                    }
                </Link>

                <form onSubmit={this.handleSubmit.bind(this)}>

                    <input onChange={(e) => { this.handleChange(e, 'company') }} id='companyInput' type='text' placeholder='company name' required />         

                    <div className='contactInfo'>
                        <label htmlFor='titleInput'>
                            <i className="fa fa-briefcase fw" aria-hidden="true"></i>
                        </label>
                        <input onChange={(e) => { this.handleChange(e, 'title') }} value={this.state.title} id='titleInput' type='text' placeholder='job title' required />               
                        
                        <label htmlFor='nameInput'>
                            <i className="fa fa-id-card fw" aria-hidden="true"></i>
                        </label> 
                        <input onChange={(e) => { this.handleChange(e, 'name') }} id='nameInput' type='text' placeholder='name of contact' required disabled={this.state.submitted} />

                        <label htmlFor='emailInput'>
                            <i className="fa fa-envelope fw" aria-hidden="true"></i>
                        </label> 
                        <input onChange={(e) => { this.handleChange(e, 'email') }} id='emailInput' type='email' placeholder='email of contact' required disabled={this.state.submitted} />

                        <label htmlFor='linkInput'>
                            <i className="fa fa-link fw" aria-hidden="true"></i>
                        </label>
                        <input onChange={(e) => { this.handleChange(e, 'link') }} id='linkInput' type='url' placeholder='post url' required disabled={this.state.submitted} />
                    </div>

                    <div className='dates'>
                        <div className='date'>
                            <label htmlFor='datePostedInput'>posted date</label>
                            <input onChange={(e) => { this.handleChange(e, 'datePosted') }} id='datePostedInput' type='date' required disabled={this.state.submitted} />
                        </div>

                        <div className='date'>
                            <label htmlFor='dateAppliedInput'>date applied</label>
                                <input onChange={(e) => { this.handleChange(e, 'dateApplied') }} id='dateAppliedInput' type='date' required disabled={this.state.submitted} />
                        </div>
                    </div>

                        {this.state.submitted
                            ? null
                            : <button className='submitButton' type='submit'>
                                save application
                            </button>
                        }

                </form>
            </main>
        )
    }
} 

// application congratulation and summary
class ApplicationFeedback extends React.Component{
    render(feedback){
        return(
            <section className='newFeedback'>
            
                <h2>Application saved!</h2>
                <p>{this.props.feedback.company} would be lucky to have you!</p>
            </section>
        )
    }
}