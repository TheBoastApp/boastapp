const ProfileButton = (props: any) => {
  // TODO: insert logic to determine if logged in or not
  const onClick = () => console.log('clicked!');
  console.log("Hello there");

  const profileButtonStyle = {
    width: "75px",
    padding: "10px",
    borderRadius: "50%",
  };

  return (
    <div>
    <img style={profileButtonStyle} src={props.src} onClick={onClick} alt={props.alt}/>
    </div>
  );
};

export default ProfileButton;
