export const Footer = () => {

    return <footer
        className={"py-2 container col-12"}
        style={{
            borderTop: '1px solid #777',
            textAlign: 'center',
            position: 'fixed',
            bottom: 0,
        }}
    >
        <span className={"h4 pt-4 m-2 text-white-50"}>&copy; AJ Bhandal</span>
    </footer>;
}