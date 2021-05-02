<script lang="ts">
  import { Button, Col, Row } from 'sveltestrap';
  import { Router, Route } from 'svelte-navigator';
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
  />
</svelte:head>

<Router>
  <main>
    <Route path="/"
      ><Row>
        <Col>
          <Button color="primary" outline>Hello World!</Button>
        </Col>
      </Row></Route
    >
  </main>
</Router>
