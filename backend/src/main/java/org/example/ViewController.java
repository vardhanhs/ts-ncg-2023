package org.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/view")
public class ViewController {
    private final ViewRepository viewRepository;

    @Autowired
    public ViewController(ViewRepository viewRepository) {
        this.viewRepository = viewRepository;
    }

    @PostMapping
    public ResponseEntity<Void> createView(@RequestBody @Valid View view) {
        viewRepository.save(view);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<View>> getAllViews() {
        List<View> views = viewRepository.findAll();
        return ResponseEntity.ok(views);
    }

    @GetMapping("/{viewId}")
    public ResponseEntity<View> getViewById(@PathVariable Long viewId) {
        Optional<View> optionalView = viewRepository.findById(viewId);
        return optionalView.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{viewId}")
    public ResponseEntity<Void> deleteView(@PathVariable Long viewId) {
        if (viewRepository.existsById(viewId)) {
            viewRepository.deleteById(viewId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{viewId}")
    public ResponseEntity<Void> updateView(@PathVariable Long viewId, @RequestBody @Valid View updatedView) {
        if (viewRepository.existsById(viewId)) {
            updatedView.setViewId(viewId);
            viewRepository.save(updatedView);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
