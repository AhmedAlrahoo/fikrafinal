const Result = ({testsType,result}) => {
  
    return (
        <div className="info">
          <div className="field">
{result.lab_test_type}
            {/*for getting test name {testsType.find((e)=>e.id===result.labtestid).name} */}
          </div>
          <div className="field">
            {result.first_test_Result}
          </div>
          <div className="field">
            {result.second_test_result}
          </div>
        </div>
    )
};

export default Result;