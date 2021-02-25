export default {
    state:{
        inner_height:[],
        inner_width:[],
        outer_height:[],
        outer_width:[],
        materials:[]
    },
    mutations:{
        SETNAVSTATE(state, data){
            state.inner_height = data.inner_height
            state.inner_width = data.inner_width
            state.outer_height = data.outer_height
            state.outer_width = data.outer_width
            state.materials = data.materials
        }
    }
}