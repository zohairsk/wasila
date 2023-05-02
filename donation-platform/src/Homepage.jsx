export default function Homepage(){
    //database se aaega
    const org_array = [
        {name: "Edhi Foundation",
    description: "slay"},
    {name: "Aleena FOundation",
    description: "yummy"
    }
    ]

    const orgdata = org_array.map(org => (
        <>
        <h1>{org.name}</h1>
        <p>{org.description}</p>
        </>
    ))
    return(
    <>
        {orgdata}
    </>
    )
}