<Toolbar>
  <IconButton
    edge="start"
    className={classes.menuButton}
    color="inherit"
    aria-label="menu"
    onClick={() => setIsOpenBar((prev) => !prev)}
  >
    <MenuIcon />
  </IconButton>
  <Typography variant="h6" className={classes.title}>
    {title}
  </Typography>
  <Button color="inherit">Login</Button>
</Toolbar>;
