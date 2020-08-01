    import React, { Component} from 'react';
//import {BrowserRouter, Switch,Route} from 'react-router-dom';
import './App.css';
import { NavLink } from 'react-router-dom';
import Yash from './Yash.png';
import Tanusri from './Tanusri.png';
import Lightbulb from './lightbulb.png';
import lightbulbyash from './YashPOV.png';
import beginning from './beginning.png';
import about from './about.png';
//import Landing from './components/Home/Landing';
//import { SearchForm } from './components/Home/SearchForm';

//import Provider from 'react-redux';
//import store from './store';

class Home extends Component {
    render(){
        return(
            <div className="Home" >
        

  
  <header className="masthead">
    <div className="container">
      <div className="intro-text">
        <div className="intro-lead-in">Welcome To RECOMMENDO!</div>
        <div className="card-subtitle" ><h4>Throw Decisiveness Out The Window</h4></div>
        <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Tell Me More</a>
      </div>
    </div>
  </header>
        
        <section className="page-section" id="services">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Services</h2>
                    
                </div>
                <div className="row text-center">
                 <div className="col-md-12">
                   <button>
                      <span className="fa-stack fa-4x">
                            <i className="fa fa-circle fa-stack-2x text-primary"></i>
                            <i className="fa fa-film fa-stack-1x fa-inverse"></i>
                      </span>
                    </button>                        
                    <NavLink to="/Landing"> <h4 className="my-3">Movies</h4></NavLink>
                     <p className="text-muted">Find out which movie you will watch tonight curled up in your bed.</p>
                    </div>
                  
                  
                </div>
            </div>
        </section>
      
     
        
        <section className="page-section" id="about">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">About</h2>
                    <h3 className="section-subheading text-muted">Recommendo is our baby!</h3>
                </div>
                <ul className="timeline">
                    <li>
                        <div className="timeline-image"><img className="rounded-circle img-fluid" src={Lightbulb} alt="Tanusri's POV" /></div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4>May 2020</h4>
                                <h4 className="subheading">Our Humble Beginnings:
                                                              Tanusri's POV</h4>
                            </div>
                            <div className="timeline-body"><p className="text-muted">There I was laying on my couch reading a book and an idea just strolled into my head. What if there was a way to know which movies to watch based on what we previously watched . I immediately texted Yash about it and the rest is history.</p></div>
                        </div>
                    </li>
                    <li className="timeline-inverted">
                        <div className="timeline-image"><img className="rounded-circle img-fluid" src={lightbulbyash} alt="Yash's POV" /></div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4>May 2020</h4>
                                <h4 className="subheading">Our Humble Beginnings:
                                                              Yash's POV</h4>
                            </div>
                            <div className="timeline-body"><p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                        </div>
                    </li>
                    <li>
                        <div className="timeline-image"><img className="rounded-circle img-fluid" src={beginning} alt="Beginning" /></div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4>June 2020</h4>
                                <h4 className="subheading">The Beginning Is Always Today</h4>
                            </div>
                            <div className="timeline-body"><p className="text-muted">We contemplated the idea and had loads of doubt on our abilities like every other mortal. But we soon realized that if we don't give it a try, we'll never find out where it could have taken us, and thus we began our journey to create what we consider our child.</p></div>
                        </div>
                    </li>
                    <li className="timeline-inverted">
                        <div className="timeline-image"><img className="rounded-circle img-fluid" src={about} alt="About" /></div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4>About us:</h4>
                                <h4 className="subheading">What is Recommendo</h4>
                            </div>
                            <div className="timeline-body"><p className="text-muted">Here's how this works: You are tucked in for the night. You want to watch a movie but it takes you forever to decide which movies you want to watch and finally it's 4 a.m and neither did you watch a movie nor did you sleep.
With Recommendo we are with you! We are here to help you find the perfect movie based on the recent ones you've completed.</p></div>
                        </div>
                    </li>
                    <li className="timeline-inverted">
                        <div className="timeline-image">
                            <h4>
                                Be A Part
                                <br />
                                Of Our
                                <br />
                                Story!
                            </h4>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        
        <section className="page-section bg-light" id="team">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                    <h3 className="section-subheading text-muted">It takes Two Flints To Start A Fire.</h3>
                </div>
                <div className="row">
                    <div className="col-lg-7">
                        <div className="team-member">
                            <img className="mx-auto rounded-circle" src={Tanusri} alt="Tanusri Bhowmick" />
                            <h4>Tanusri Bhowmick</h4>
                            <p className="text-muted">Frontend Developer</p>
                            <a className="btn btn-dark btn-social mx-2" href="https://twitter.com/BhowmickTanusri"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="https://www.facebook.com/tanusri.bhowmick"><i className="fa fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="https://www.instagram.com/tanusri2000/"><i className="fa fa-instagram"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="https://www.linkedin.com/in/tanusri-bhowmick-81b3b1195/"><i className="fa fa-linkedin"></i></a>
                            
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="team-member">
                        <img
                            src={Yash}
                            className="mx-auto rounded-circle"
                            alt="Yash Sonar"
                        />
                            <h4>Yash Sonar</h4>
                            <p className="text-muted">Frontend Developer</p>
                            <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-instagram"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-linkedin"></i></a>
                        </div>
                    </div>
                   
                </div>
              
            </div>
        </section>
        
        <div className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 my-3">
                       <a href="#!"><img className="img-fluid d-block mx-auto" src="assets/img/logos/envato.jpg" alt="" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid d-block mx-auto" src="assets/img/logos/designmodo.jpg" alt="" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid d-block mx-auto" src="assets/img/logos/themeforest.jpg" alt="" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid d-block mx-auto" src="assets/img/logos/creative-market.jpg" alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
        
      
       
      </div>
        );
    }
}
    export default Home;