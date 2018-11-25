import React  from 'react';
import burgerLogo from '../../assets/images/burger-2-72-263966.ico';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;