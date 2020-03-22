# use-via-cep :earth_americas:

This is a simple React Hooks that let you search for a brazillian postal-code on: https://viacep.com.br. :squirrel:

# How to use

Simply import `use-via-cep` on your component, then call this on that way:

```jsx
import useViaCep from "use-via-cep";

const Foo = () => {
  const [postalCode, setPostalCode] = useState("");

  const [loading, cep, error] = useViaCep(postalCode);

  return (
    <div className="field">
      <label>CEP:</label>
      <input onChange={e => setPostalCode(e.target.value)} value={postalCode} />
    </div>
  );
};
```

Every time that the argument passed to the hooks get a length of 8, this will trigger a call to the API, changing the `loading` param to `true`.

## TODO:

[ ] Port to TS
[ ] Apply some cool CSS to `example`
[ ] Write TESTS!
[ ] Deploy example to `surge.sh`!
[ ] Configure Github Actions
