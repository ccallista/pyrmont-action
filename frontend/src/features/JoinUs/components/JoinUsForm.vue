


<script setup>
    import {handleError, ref} from 'vue'
    import joinUsService from '../services/joinUsAuthService'
    import { reactive } from 'vue';



    const stateChosen = ref('Default')
    const stateOptions = ref([
        {text: 'State', value: "Default", placeholder: true},
        {text: 'NSW', value: "NSW", placeholder: false},
        {text: 'SA', value: "SA", placeholder: false},
        {text: 'WA', value: "WA", placeholder: false},
        {text: 'NT', value: "NT", placeholder: false},
        {text: 'QLD', value: "QLD", placeholder: false},
        {text: 'VIC', value: "VIC", placeholder: false},
        {text: 'TAS', value: "TAS", placeholder: false}

    ])

    const signUpError = reactive({
        emailError: false,
        passwordError: false,
        firstNameError: false,
        lastNameError: false,
        mobilePhoneError: false,
        areaOfInterestError: false,
        streetNameError: false,
        cityError: false,
        stateError: false,
        postcodeError: false
        
    })
  

    const signUpData = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobilePhone: null,
        areaOfInterest: '',
        streetName: '',
        city: '',
        state: '',
        postcode: null
    }



  
    const handleSubmit = async () => {
        try{
            signUpData.state = stateChosen.value;
            const response = await joinUsService.joinus(signUpData);
            const signUpResponse = await response.json();
            console.log(signUpResponse)
            signUpError.emailError= signUpError.passwordError = signUpError.firstNameError = signUpError.postcodeError = signUpError.stateError = signUpError.lastNameError = signUpError.cityError = signUpError.mobilePhoneError = false;
            if(response.status === 400){
                for(const error of signUpResponse.errors){
                    if(error ==="email") signUpError.emailError = true;
                    if(error ==="password") signUpError.passwordError = true;
                    if(error ==="firstName") signUpError.firstNameError = true;
                    if(error ==="lastName") signUpError.lastNameError = true;
                    if(error ==="mobilePhone") signUpError.mobilePhoneError = true;
                    if(error ==="city") signUpError.cityError = true;
                    if(error ==="state") signUpError.stateError = true;
                    if(error ==="postcode") signUpError.postcodeError = true;
                    console.log(error);

                }
            }
        }
        catch(error){
            console.log(error)
        }
     
    }


</script>

<template>
    <body>
        <div class="signup-container">
            <div class="signup-form-container">
                <form class="sign-entries" @submit.prevent="handleSubmit">
                    <h1 id="create-an-account-heading"> Let's create an account </h1>

                    <h2>Login Details</h2>
                    <div class="login-details-section">
                        <input type="email" id="email" placeholder="Email address" v-model="signUpData.email" :class="{'error-border': signUpError.emailError}"/>
                        <input type="password" id="password" placeholder="Password" v-model="signUpData.password" :class="{'error-border': signUpError.passwordError}" />
                    </div>

                    <h2>Personal Details</h2>
                    <div class="personal-details-section">
                        <input type="text" id="first-name" v-model=signUpData.firstName placeholder="First Name" :class="{'error-border': signUpError.firstNameError}" />
                        <input type="text" id="last-name" v-model=signUpData.lastName placeholder="Last Name" :class="{'error-border': signUpError.lastNameError}" />
                        <input type="tel" id="mobile-phone" v-model=signUpData.mobilePhone placeholder="Mobile Phone" :class="{'error-border': signUpError.mobilePhoneError}" pattern="[0-9]{10}" />
                        <input type="text" v-model="signUpData.areaOfInterest" id="areaOfInterestTextArea" placeholder="Area of Interest">
                    </div>

                    <h2>Address Details</h2>
                    <div class="address-details-section">
                        <input type="text" id="street-name" v-model=signUpData.streetName placeholder="Street Name"/>
                        <input type="text" id="city" :class="{'error-border': signUpError.cityError}" v-model=signUpData.city placeholder="City"/>
         

                        <select v-model="stateChosen" id="state" :class="signUpError.stateError ? 'error-border' : 'input-valid'" required>
                            <option v-for="state in stateOptions" :value="state.value" :disabled=state.placeholder :hidden=state.placeholder :selected=state.placeholder>
                                {{ state.text }}
                            </option>
                        </select>
                        <input type="text" id="postcode" v-model=signUpData.postcode placeholder="Postcode" pattern="[0-9]{4}" :class="{'error-border': signUpError.postcodeError}"/>
                    </div>
                    <button id="submitBtn" type="submit">Sign Up</button>


                </form>
            </div>
        </div>
    </body>
</template>

<style scoped>
    .error-border{
        border: 1px solid red;
    }
    .input-valid{
        border: 1px solid #cbc8c8;
    }

    .signup-container{
        height: 130vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #F8F8F8;
        align-items: center;
    }


    .signup-form-container{
        display: inline-block;
        position:absolute;
        top: 100px;

 
        background-color: white;
        width: 50vw;
        border-radius: 5px;
        padding:3rem;
    }

    .login-details-section{
        display: flex;
        row-gap: 20px;
        flex-direction: column;
        margin-bottom: 20px;
        margin-top: 10px;
    }

    ::placeholder{
        font-family: 'Inter', sans-serif;
        font-size: small;
        padding-left: 0.5rem;
    }



    h2{
      color: #EBBD6D;
      font-size: large;
      margin-bottom: 0px;
    }

    h3{
        color: #3A474E;
        font-size: large;
    }
    hr{
        border-top: 2px solid black;
        margin-bottom: 20px;
    }

    input, select{
        border-radius: 3px;
        border: 1px solid;
        background-color: #F8F8F8;
        border-color: #cbc8c8;
        height: 35px
    }
    

    h1{
        color: #ebae45;
        margin-bottom: 30px;
    }
  
    
    select{
        height: 35px;
        font-family: 'Inter', sans-serif;
        font-size: small;
        padding-left: 0.5rem;
        color: grey;
    }


    .personal-details-section, .address-details-section{
        margin-top: 10px;
        margin-bottom: 20px;
        display:grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(3, 1fr);
        row-gap: 20px;
        column-gap: 10px;
        

    }

    #mobile-phone{
        grid-row: 2;
        grid-column: 1/3;

    }


    #street-name{
        grid-row:1;
        grid-column: 1/3;
    }
   
    #postcode, #areaOfInterestTextArea{
        grid-row: 3;
        grid-column: 1/3;
    }

    
    #areaOfInterestTextArea{
        resize: none;
    }

    #submitBtn{
        position: relative;
        background-color: #ebae45;
        border: 0px;
        color: #FFFF;
        border-radius: 3px;
        margin: 30px 0px 25px 0px;
        height: 35px;
        width: 100%;
        font-size: small;
        font-family: 'Manrope', sans-serif;
        font-weight: bold;
    }

</style>