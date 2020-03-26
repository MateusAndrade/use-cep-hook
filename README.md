# use-cep-hook :earth_americas: ![npm](https://img.shields.io/npm/v/use-cep-hook)

This is a simple React Hooks that let you search for a brazillian postal-code.  

# Installation

Just run a ```yarn add use-cep-hook``` or ```npm i --save use-cep-hook```

# How to use

Simply import `use-cep-hook` on your component, then call this on that way:

```jsx
import useViaCep from "use-cep-hook";

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

- [ ] Port to TS
- [ ] Apply some cool CSS to `example`
- [ ] Write TESTS!
- [ ] Deploy example to `surge.sh`!
- [ ] Configure Github Actions
