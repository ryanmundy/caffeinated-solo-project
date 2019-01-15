import React from 'react';
import './About.css'
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

let cardStyle = {
  width: 350,
  height: 500,
  display: 'inline-block',
}

const AboutPage = () => (
  <div id="aboutDiv">
    <div id="welcomeMain">
      <h1><em>Thank you for visiting caffeinated!</em></h1>
    </div>
    <div>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      >
      <Card id="mission" style={cardStyle}>
          <img  src="https://i.stack.imgur.com/EfNDt.png" alt='caffeine molecule' width="200"/>
          <h2>Mission</h2>
        <p>Thank you for visiting caffeinated, designed by a caffeine lover for caffeine lovers. The mission of this application is, and always has been, to connect users with the products they have come to love, but cannot always find. Through this application, users are able to share products that they love, review other’s products, and tell others where they found their favorite products. Through this application, we can all stay caffeinated.</p>
      <p>-Ryan</p>
      </Card>
    
    
    
        <Card id="mission" style={cardStyle}>
          <img src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/uh59Wh0/laptop-computer-line-drawing-illustration-animation-with-transparent-background_rlrkppv-x_thumbnail-full07.png" alt='computer' width="280" />
          <h2>Built Using:</h2>
          <ul >
            <li>React.js</li>
            <li>React-Redux</li>
            <li>Redux-Sagas</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>Axios</li>
            <li>Google Maps API</li>
            <li>React-Google-Maps</li>
            <li>Node-Geocoder</li>
            <li>React-SVG-Gauge</li>
            <li>React-Star-Rating-Component</li>
            <li>Passport</li>
            <li>Material UI</li>
          </ul>
        </Card>
      </Grid>
    </div>
    {/* <div>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center">
      <Card id="mission" style={cardStyle}>
        <h2>Citations</h2>
        
      </Card>
      </Grid>
    </div> */}
  </div>
);

export default AboutPage;
