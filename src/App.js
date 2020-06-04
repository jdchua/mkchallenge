import React from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import axios from "axios"
import "./App.css";

class ContactForm extends React.Component {
    constructor(){
      super()
      this.state = {
          name: "",
          message: "",
          email: "",
          submitted: false,
      }
      this.sendMail = this.sendMail.bind(this)
    }

    setTextValue = (event) => {
      const {name, value} = event.target
      this.setState({ 
          submitted: false,
          [name]: value
      });
    }
    
    //axios to call on API 
    sendMail = (event) => {
      axios({
        method: 'post',
        url: 'https://6dylgoqdm5.execute-api.us-west-1.amazonaws.com/prod/submit',
        data: {
          name: this.state.name,
          message: this.state.message,
          email: this.state.email
        }
      });
      //reset state and show success alert after API call
      this.setState({
        name: "",
        message: "",
        email: "",
        submitted: true
      })
    }
    
    render(){
      return (
        <Container component="main" maxWidth="xs" id="container">
          <div className="main">
            {this.state.submitted ? <Alert onClose={() => {this.setState({submitted: false})}} severity="success"><AlertTitle>Success</AlertTitle>Thank you for contacting us. Someone from the team will contact you soon!</Alert> : ""}
            <img className="companyIcon" alt="MK Decision Logo" src="https://www.learnacademy.org/app/uploads/2019/04/mk_decision_logo.png"/>
            <ValidatorForm className="form" onSubmit={this.sendMail}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextValidator
                    variant="outlined"
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.setTextValue}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.setTextValue}
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email is not valid']}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={4}
                    label="Message"
                    name="message"
                    value={this.state.message}
                    onChange={this.setTextValue}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                id="submit"
              >
                Contact Us
              </Button>
            </ValidatorForm>
          </div>
        </Container>
      );
    }
}

export default ContactForm