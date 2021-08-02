import { useDataQuery } from '@dhis2/app-runtime'
import { useDataMutation } from '@dhis2/app-runtime'
const levQuery = {
    OrganisationUnits: {
        resource: 'organisationUnits',
        params:({orgLevel}) => {
            return {
                fields: 'id, name, level, geometry, parent',
                order: 'level',
                paging: false,
                level: orgLevel
            }
        },
    },
}

const mutation = {
    resource: 'dataValueSets',
    type: 'create',
    data: ({ val }) => ({
        dataValues: val
    }),
}

export const requestQuery = (org_level) => {

    // const {loading, error, data} = useDataQuery(levQuery, {variables:{
    //         orgLevel: org_level
    //     }})
    // console.log(data)
    // return data
    const [mutate, { loading }] = useDataMutation(mutation, {
        variables:{
            val: data.dataValues
        },
        onComplete: respone => {console.log(JSON.stringify(respone))},
        onError: error => {console.log(JSON.stringify(error))}
    })

        const res = async () => {
          await  mutate()
        }
    // console.log(res)
        res().then(r =>{

    })
}

let data = {"dataValues": [{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"O6uvpzGd5pu","value":0},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"fdc6uOvgoji","value":0},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"lc3eMKXaEfw","value":0.0072667548122505345},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"jUb8gELQApl","value":0},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"PMa2VCrupOd","value":0},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"kJq2mPyFEHo","value":0.001707618143044266},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"qhqAxPSTUXp","value":0},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"Vth0fbpFcsO","value":0},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"jmIPBj66vD6","value":0.0019359873166601908},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"TEQlaapDQoK","value":0.0004226269022105856},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"bL4ooGhyHRQ","value":0.03885204380265239},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"eIQbndfxQMb","value":0},{"dataElement":"oYJ51K7AJvQ","period":"20150101","orgUnit":"at6UHUQatSo","value":0.00045624988464017707}]}
