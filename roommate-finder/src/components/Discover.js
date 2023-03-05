import React from 'react';
import {useEffect, useState, useContext} from 'react';
import DiscoverCard from './DiscoverCard';
import UserContext from './UserContext';
import {Alert} from 'react-bootstrap';

export default function Discover() {

    const [userEmail, setUserEmail] = useContext(UserContext);
    /*
    const [users, setUsers] = useState([
        {id: 0,
        first_name: "Chase",
        last_name: "Mathis",
        age: 20,
        gender: 0,
        university: "University of Wisconsin - Madison",
        location: "Madison, WI",
        price_lower: 1500,
        price_upper: 2500,
        description: "Hi everyone! I am looking for housing in the NYC area this summer"},
        {
        id: 1,
        first_name: "Chris",
        last_name: "Plagge",
        gender: 0,
        age: 21,
        university: "University of Wisconsin - Madison",
        location: "Madison, WI",
        min_price: 1500,
        max_price: 2500,
        description: "HELJKEOEONGONSGONHGIONHIHNSOHNOHISHNIHHOSNHOHNHOI"}
        ]);*/

    const [users, setUsers] = useState([]);
    
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/getDiscover?email=${userEmail}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Request-Method": '*'
            }

        }).then(resp => resp.json())
        .then(resp => {
            console.log(resp);
            setUsers(resp);
        })
    }, [])


    const displayInfo = () => {
        if(userEmail){
            return users.map((u) => (
                <DiscoverCard
                    key={u.id}
                    first_name={u.first_name}
                    last_name={u.last_name}
                    gender={u.gender}
                    age={u.age}
                    university={u.university}
                    location={u.location}
                    description={u.description}
                    price_lower={u.price_lower}
                    price_upper={u.price_upper}
                    img_link={u.img_link}/>
            ));
        }
        else{
            return (
                    <Alert variant="danger" className="text-center">
                        Please fill out your profile before looking at matches
                    </Alert>
            )
        }
    }

    return (
        <div id="discoverBackground">
            {displayInfo()}
        </div>
    )
};