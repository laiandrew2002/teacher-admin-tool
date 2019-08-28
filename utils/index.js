const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);


const validateEmail = email => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};

const removeDuplicate = array => array.filter((e,i) => array.indexOf(e) === i);

const commonSet = arrays => arrays.shift().filter(v => {
    return arrays.every(a => {
        return a.indexOf(v) !== -1;
    });
});

module.exports = {
    capitalizeFirstLetter,
    validateEmail,
    removeDuplicate,
    commonSet
}