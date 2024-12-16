type ResultsCountProps = {
  total: number;
}

const ResultsCount = ({ total } : ResultsCountProps)=> {
  return <p className="count">{`${total} results`}</p>;
}

export default ResultsCount;
