
const UserPage = ({id,answer}) => {
  return (
    <div className="p-3 mb-4  flex flex-col  shadow-lg gap-4 rounded-md rounded-tr-none bg-gradient-to-r from-purple-300 to-purple-500 max-w-60 ml-auto">
      <p className="text-sm">Question {id}): {answer}</p>
      <div className="text-right text-muted-foreground text-sm">11:45</div>
    </div>
  );
};

export default UserPage;
