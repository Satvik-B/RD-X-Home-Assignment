import React from 'react'
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

class Weather extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {longitude: 79.477, latitude: 27.204, items:[],
            DataLoaded: false, address: [], addressSet:false, showThreeDays:false};
        }
    month_names_short= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    week_names_short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    today = new Date();
    date = this.today.getHours()+":"+this.today.getMinutes()+", "+this.month_names_short[this.today.getMonth()]+" "+this.today.getDate();
    
    updateWeather = ()=>
    {
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+this.state.latitude+"&lon="+this.state.longitude+"&exclude=hourly,alerts,minutely&units=metric&appid=16a5477947359428783c80ece6c3a2cd")
        .then((res) => res.json()).then((json)=>{
            this.setState({items:json,
            DataLoaded: true});
        },
        error => {
            console.log("error in loading data");
          }
        )

        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+this.state.latitude+","+this.state.longitude+"&key=AIzaSyAXFFmqi-9sGBTbXNedonNH3koLV3rjqL8")
        .then((res) => res.json()).then((json)=>{
            this.setState({address:json, addressSet:true});
            console.log(JSON.stringify(json, null, 2));
        },
        error => {
            console.log("error in loading data from gmap");
          }
        )
    }
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({ longitude: (position.coords.longitude), latitude: (position.coords.latitude) }, ()=>this.updateWeather());
            });

        } else {
            this.setState({longitude: 79.477, latitude: 27.204});
        }
    }
    
    componentWillUnmount() {
        this.getLocation();
    }
    componentDidMount(){
        this.getLocation();        
    }

    render() { 
        return <>
        <Box sx={{display:"flex", flexDirection:"column"}}>
            <Box sx={{height:"50vh", display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"left"}}>
                    <Typography variant="h5">
                        {this.date}
                    </Typography>
                    <Typography variant="h2">
                        {(this.state.addressSet?this.state.address.plus_code.compound_code.substring(9):"address not set yet")}
                    </Typography>
                </Box>
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%"}}>
                    {this.state.DataLoaded?
                        <Box sx={{display:"flex", flexDirection:"row", alignContent:"center", justifyContent:"center", textAlign:"center", height:"10vh"}}>
                            <Box sx={{ alignItems: "center", justifyContent: "center"}}>
                                <img src={"http://openweathermap.org/img/wn/"+this.state.items.current.weather[0].icon+"@2x.png"} style={{display:"flex", margin:"auto", verticalAlign:"center"}}/>
                            </Box>
                            <Typography variant='h3' sx={{display:"flex", alignItems:"left", margin:"auto 0"}}>{this.state.items.current.temp+"°C"}</Typography>
                        </Box>

                        :<Typography variant="h3"> Loading Data </Typography>}
                    <Button variant="contained" size = "small" sx={{width: "50%"}} onClick = { () => {
                        this.setState({showThreeDays:!this.state.showThreeDays})
                    }}>
                        Next 3 Days Forecast
                    </Button> 
                </Box>
            </Box>
            
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%", height:"50vh"}}>
                {this.state.showThreeDays?
                this.state.DataLoaded?
                [0,1,2].map(i => {
                    let temp=this.state.items.daily[i];
                    let currDate = new Date(temp.dt*1000);
                    let str = this.week_names_short[currDate.getDay()]+", "+this.month_names_short[currDate.getMonth()]+" "+currDate.getDate();
                    let maxminstr = temp.temp.max+"/"+temp.temp.min+"°C";
                    return <Box sx={{display:"flex", flexDirection:"row", width:"80%", justifyContent:"space-between", alignItems:"center", textAlign:"center"}} key={i}>
                            <Typography variant="body1" sx={{display:"flex", alignItems:"left", width:"20%"}}>{str}</Typography>
                            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", textAlign:"center", width:"50%"}}>
                                <img src={"http://openweathermap.org/img/wn/"+temp.weather[0].icon+"@2x.png"} />
                                <Typography variant ="body1">{maxminstr}</Typography>
                            </Box>
                            <Typography variant="body1" sx={{display:"flex", alignItems:"left", textAlign:"center", justifyContent:"center"}}>{temp.weather[0].description}</Typography>
                            <br/>
                        </Box>
                    })
                    
                    :<Typography variant="h3"> Loading Data </Typography>:null}
            </Box>
        </Box>
        </>;
    }
}



export default Weather;