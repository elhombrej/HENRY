import React from 'react';

export function validate(input){

  let errors={};

  if (!input.username){

    errors.username = "Username is required";
  
  } else if (!/\S+@\S+\.\S+/.test(input.username)) {

    errors.username = "Username is invalid";

  }

  if (!input.password){

    errors.password = "Password is required";

  } else if (!/(?=.*[0-9])/.test(input.password)) {

    errors.password = "Password is invalid";

  }

  return errors;

}

export default function  Form() {

  const [input,setInput] = React.useState({ username: '' , password: '' });

  const [errors, setErrors] = React.useState({});

  const handleInputChange = function(evento){

    setInput(estadoPrevio=>({...estadoPrevio,[evento.target.name]:evento.target.value}))
  
    let errors = validate({...input, [evento.target.name]:evento.target.value});
  
    setErrors(errors);
  
  };
  


  return (
        <form>

          <div>

            <label>Username:</label>
            
            <input type="text" name="username" value={input.username} onChange={handleInputChange} className={errors.username && "danger"} />
          
          </div>
          
          <div>
            
            <label>Password:</label>
            
            <input type="password" name="password" value={input.password} onChange={handleInputChange} className={errors.password && "danger"}/>

          </div>
        
        </form>
  )
}
