const ProfileButton = (props: any) => {
  // TODO: insert logic to determine if logged in or not
  const onClick = () => console.log('clicked!');
  console.log("Hello there");

  return (
    <div>
    <img src={props.src} onClick={onClick} alt={props.alt}/>
    </div>
  );
};

export default ProfileButton;
