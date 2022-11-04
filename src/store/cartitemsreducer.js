const initialState=[]

const cartitemsreducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case 'AddItem':   
            console.log(action.payload)         
            return [...state,action.payload] 
        case 'RemoveItem':
            state=state.filter(x=>x.id!==action.payload.id)            
            return state
        case 'Clear':
            state=[]
            return state
        default:
            return state
    }
}

export default cartitemsreducer;